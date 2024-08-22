using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAAPI.Dtos
{
    public sealed record RegisterDto
    (
        string UserName,
        string FirstName,
        string LastName,
        string Email,
        string Password
    );
}