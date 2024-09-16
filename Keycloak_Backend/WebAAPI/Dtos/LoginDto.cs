using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAAPI.Dtos
{
    public sealed record LoginDto
    (
        string UserName,
        string Password
    );
}