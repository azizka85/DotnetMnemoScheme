using System.Text.Json;

using Microsoft.AspNetCore.Mvc;

using AzizkaDotNetI18n.Options;

using DotnetMnemoScheme.Helpers;

namespace DotnetMnemoScheme.Controllers
{
    public class TranslationController : Controller
    {
        protected LanguageHelper languageHelper;

        public TranslationController(LanguageHelper languageHelper)
        {
            this.languageHelper = languageHelper;
        }

        public IActionResult Index(string? lang)
        {
            return Content
            (
                JsonSerializer.Serialize<DataOptions?>
                (
                    value: languageHelper.GetDataOptions
                    (
                        HttpContext,
                        lang
                    ),
                    options: new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                    }
                ),
                "application/json;charset=UTF-8"
            );
        }
    }
}
