using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebAAPI.Dtos;
using WebAAPI.Options;
using WebAAPI.Services;

namespace WebAAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    // [Authorize]
    public class UserRolesController(KeycloakService keycloakService, IOptions<KeycloakConfiguration> options) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> AssigmentRolesByUserId(Guid userId, List<RoleDto> roles, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users/{userId}/role-mappings/clients/{options.Value.ClientUUID}";

            var response = await keycloakService.PostAsync<string>(endpoint, roles, true, cancellationToken);

            if (response.IsSuccessful && response.Data is null)
            {
                response.Data = "User roles assigments is sucessfull";
            }

            return StatusCode(response.StatusCode, response);
        }
        [HttpDelete]
        public async Task<IActionResult> UnAssigmentRolesByUserId(Guid userId, List<RoleDto> roles, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users/{userId}/role-mappings/clients/{options.Value.ClientUUID}";

            var response = await keycloakService.DeleteAsync<string>(endpoint, roles, true, cancellationToken);

            if (response.IsSuccessful && response.Data is null)
            {
                response.Data = "User roles unassigments is sucessfull";
            }

            return StatusCode(response.StatusCode, response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserRolesByUserId(Guid userId, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users/{userId}/role-mappings/clients/{options.Value.ClientUUID}";

            var response = await keycloakService.GetAsync<object>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }
    }
}