using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TS.Result;
using WebAAPI.Dtos;
using WebAAPI.Options;
using WebAAPI.Services;

namespace WebAAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    public sealed class UsersController(KeycloakService keycloakService, IOptions<KeycloakConfiguration> options) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAllUsers(CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users";

            Result<List<UserDto>> response = await keycloakService.GetAsync<List<UserDto>>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }
    }
}