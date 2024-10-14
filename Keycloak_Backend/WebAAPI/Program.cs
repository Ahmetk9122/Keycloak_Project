using WebAAPI.Controllers;
using WebAAPI.Options;
using WebAAPI.Services;
using Keycloak.AuthServices.Authentication;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Keycloak.AuthServices.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup =>
{
    var jwtSecuritySheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put **_ONLY_** yourt JWT Bearer token on textbox below!",

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtSecuritySheme.Reference.Id, jwtSecuritySheme);

    setup.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { jwtSecuritySheme, Array.Empty<string>() }
                });
});

builder.Services.Configure<KeycloakConfiguration>(builder.Configuration.GetSection("KeycloakConfiguration"));

builder.Services.AddScoped<KeycloakService>();

builder.Services.AddControllers();
//Keycloak kullanarak Authentication işlemini kullanmamıza yarıyan yapı.
builder.Services.AddKeycloakWebApiAuthentication(builder.Configuration);
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UserGetAll", builder =>
    {
        builder.RequireResourceRoles("UserGetAll");

    });
    options.AddPolicy("UserCreate", builder =>
    {
        builder.RequireResourceRoles("UserCreate");

    });
    options.AddPolicy("UserUpdate", builder =>
    {
        builder.RequireResourceRoles("UserUpdate");

    });
    options.AddPolicy("UserDelete", builder =>
    {
        builder.RequireResourceRoles("UserDelete");

    });
    //    options.AddPolicy("users", builder =>
    //     {
    //         builder.RequireResourceRoles("UserGetAll", "UserCreate", "UserUpdate", "UserDelete");

    //     });
}).AddKeycloakAuthorization(builder.Configuration);

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/get-access-token", async (KeycloakService keycloakService) =>
{
    string token = await keycloakService.GetAccessToken(default);
    return Results.Ok(new { AccessToken = token });
});

app.MapControllers();

app.Run();
