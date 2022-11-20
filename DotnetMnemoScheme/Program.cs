using DotnetMnemoScheme.Helpers;
using DotnetMnemoScheme.Middlewares;
using DotnetMnemoScheme.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddSingleton<Settings>();

builder.Services.AddSingleton<LanguageHelper>();
builder.Services.AddSingleton<ViewHelper>();

var app = builder.Build();

app.UseStaticFiles();

app.UseMiddleware<WebApiExceptionMiddleware>();

app.MapControllerRoute
(
    name: "translation",
    pattern: "translation/{lang?}",
    defaults: new
    {
        controller = "Translation",
        action = "Index"
    }
);

app.MapControllerRoute(
    name: "routes",
    pattern: "{lang?}/{action=List}",
    defaults: new
    {
        controller = "Routes"
    }
);

app.MapControllerRoute(
    name: "route",
    pattern: "{lang}/route/{id?}",
    defaults: new
    {
        controller = "Routes",
        action = "Route"
    }
);

app.Run();
