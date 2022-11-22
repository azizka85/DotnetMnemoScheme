using Microsoft.AspNetCore.Mvc;

using DotnetMnemoScheme.Models;
using DotnetMnemoScheme.Helpers;
using DotnetMnemoScheme.ViewModels.Routes;

namespace DotnetMnemoScheme.Controllers
{
    public class RoutesController : Controller
    {
        protected Settings settings;
        protected LanguageHelper languageHelper;
        protected ViewHelper viewHelper;

        public RoutesController(Settings settings, LanguageHelper languageHelper, ViewHelper viewHelper)
        {
            this.settings = settings;
            this.languageHelper = languageHelper;
            this.viewHelper = viewHelper;
        }

        public IActionResult List(string? lang, string? city, string? range, int? id)
        {
            lang = languageHelper.CheckLanguage(HttpContext, lang);

            var ajax = Request.Query["ajax"];
            
            var title = id == null ? 
                $"- {languageHelper.Translate(lang, "Routes")}" : 
                $"- {languageHelper.Translate(lang, "Route")} - {id}";

            var viewData = viewHelper.Render(
                ajax: ajax.Count > 0 && ajax[ajax.Count - 1] == "1",
                lang: lang,
                title: title,
                content: "~/Views/Routes/Route.cshtml",
                contentData: new RouteModel
                {
                    Id = id,
                    City = city,
                    Range = range,
                    Lang = lang
                },
                layouts: new List<string>
                {
                    "main-layout"
                }
            );

            return View(
                viewName: viewData.Content,
                model: viewData.ContentData
            );
        }
    }
}
