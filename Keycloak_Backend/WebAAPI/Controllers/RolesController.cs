using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

    public class RolesController(KeycloakService keycloakService, IOptions<KeycloakConfiguration> options) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllRoles(CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/clients/{options.Value.ClientUUID}/roles";

            var response = await keycloakService.GetAsync<List<RoleDto>>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }
        [HttpGet]
        public async Task<IActionResult> GetRoleByName(string name, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/clients/{options.Value.ClientUUID}/roles/{name}";

            var response = await keycloakService.GetAsync<RoleDto>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRole(CreateRoleDto request, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/clients/{options.Value.ClientUUID}/roles/";

            var response = await keycloakService.PostAsync<string>(endpoint, request, true, cancellationToken);

            if (response.IsSuccessful && response.Data is null)
            {
                response.Data = "Role crete is sucessfull";
            }

            return StatusCode(response.StatusCode, response);
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteRoleByName(string name, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/clients/{options.Value.ClientUUID}/roles/{name}";

            var response = await keycloakService.DeleteAsync<string>(endpoint, true, cancellationToken);
            if (response.IsSuccessful && response.Data is null)
            {
                response.Data = "Role delete is sucessfull";
            }

            return StatusCode(response.StatusCode, response);
        }
    }
}