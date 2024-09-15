using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TS.Result;
using WebAAPI.Dtos;
using WebAAPI.Options;
using WebAAPI.Services;

namespace WebAAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IOptions<KeycloakConfiguration> options, KeycloakService keycloakService) : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Register(RegisterDto registerDto, CancellationToken cancellationToken = default)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users";
            object data = new
            {
                username = registerDto.UserName,
                firstName = registerDto.FirstName,
                lastName = registerDto.LastName,
                email = registerDto.Email,
                enabled = true,
                emailVerified = true,
                credentials = new List<object>{
                    new
                    {
                        type="password",
                        temporary=false,
                        value= registerDto.Password
                    }
                }
            };

            var response = await keycloakService.PostAsync<string>(endpoint, data, true, cancellationToken);
            if (response.IsSuccessful && response.Data is null)
                response.Data = "User create is successfull";
            return StatusCode(response.StatusCode, response);
        }
    }
}