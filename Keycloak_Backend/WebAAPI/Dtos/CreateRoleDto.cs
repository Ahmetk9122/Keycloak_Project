using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebAAPI.Dtos
{
    public class CreateRoleDto
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = default!;

        [JsonPropertyName("description")]
        public string Description { get; set; } = default!;
    }
}