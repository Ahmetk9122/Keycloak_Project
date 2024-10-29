using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TS.Result;
using WebAAPI.Dtos;
using WebAAPI.Options;
using WebAAPI.Services;

namespace WebAAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public sealed class UsersController(KeycloakService keycloakService, IOptions<KeycloakConfiguration> options) : ControllerBase
    {
        [HttpGet]
        [Authorize("UserGetAll")]
        public async Task<IActionResult> GetAllUsers(CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users";

            Result<List<UserDto>> response = await keycloakService.GetAsync<List<UserDto>>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }
        [Authorize("UserGetAll")]
        [HttpGet]
        public async Task<IActionResult> GetByEmail(string email, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users?email={email}";

            Result<List<UserDto>> response = await keycloakService.GetAsync<List<UserDto>>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }
        [Authorize("UserGetAll")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users/{id}";

            Result<UserDto> response = await keycloakService.GetAsync<UserDto>(endpoint, true, cancellationToken);

            return StatusCode(response.StatusCode, response);
        }

        [Authorize("UserUpdate")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, UpdateUserDto updateUserDto, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users/{id}";

            var response = await keycloakService.PutAsync<string>(endpoint, updateUserDto, true, cancellationToken);

            if (response.IsSuccessful && response.Data is null)
            {
                response.Data = "User update is successful";
            }

            return StatusCode(response.StatusCode, response);
        }

        [Authorize("UserDelete")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserById(Guid id, CancellationToken cancellationToken)
        {
            string endpoint = $"{options.Value.HostName}/admin/realms/{options.Value.Realm}/users/{id}";

            var response = await keycloakService.DeleteAsync<string>(endpoint, true, cancellationToken);

            if (response.IsSuccessful && response.Data is null)
            {
                response.Data = "User delete is successful";
            }

            return StatusCode(response.StatusCode, response);
        }
    }
}