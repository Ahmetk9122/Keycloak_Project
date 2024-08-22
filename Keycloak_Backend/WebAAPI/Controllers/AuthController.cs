using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
            string stringData = JsonSerializer.Serialize(data);
            var content = new StringContent(stringData, Encoding.UTF8, "application/json");

            HttpClient httpClient = new HttpClient();

            string token = await keycloakService.GetAccessToken();

            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var message = await httpClient.PostAsync(endpoint, content, cancellationToken);

            if (!message.IsSuccessStatusCode)
            {
                var response = await message.Content.ReadAsStringAsync();

                if (message.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    var errorResultForBadRequest = JsonSerializer.Deserialize<BadRequestErrorResponseDto>(response);
                    return BadRequest(new { ErrorMessage = errorResultForBadRequest!.ErrorMessage });
                }

                var errorResultForOther = JsonSerializer.Deserialize<BadRequestErrorResponseDto>(response);
                return BadRequest(new { ErrorMessage = errorResultForOther!.ErrorMessage });
            }

            return Ok(new { Message = "User create was succcesful" });
        }
    }
}