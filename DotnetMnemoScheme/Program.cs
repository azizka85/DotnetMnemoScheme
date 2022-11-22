using DotnetMnemoScheme.Helpers;
using DotnetMnemoScheme.Middlewares;
using DotnetMnemoScheme.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddSingleton<Settings>();

builder.Services.AddSingleton<StringHelper>();
builder.Services.AddSingleton<RequestHelper>();
builder.Services.AddSingleton<LanguageHelper>();
builder.Services.AddSingleton<ViewHelper>();

var app = builder.Build();

app.UseStaticFiles();

app.UseMiddleware<WebApiExceptionMiddleware>();

app.UseRouting();

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
    name: "route",
    pattern: "{lang?}/{city?}/{range?}/{id?}",
    defaults: new
    {
        controller = "Routes",
        action = "List"
    }
);

app.Run();
