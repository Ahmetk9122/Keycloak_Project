using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebAAPI.Dtos
{
    public class UpdateUserDto
    {

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; } = default!;

        [JsonPropertyName("lastName")]
        public string LastName { get; set; } = default!;

        [JsonPropertyName("email")]
        public string Email { get; set; } = default!;

        [JsonPropertyName("emailVerified")]
        public bool EmailVerified { get; set; }

        [JsonPropertyName("enabled")]
        public bool Enabled { get; set; }
    }
}