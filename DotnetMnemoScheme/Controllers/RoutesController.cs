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

        public IActionResult Route(string lang, int id)
        {
            lang = languageHelper.CheckLanguage(HttpContext, lang);

            var ajax = Request.Query["ajax"];

            var viewData = viewHelper.Render(
                ajax: ajax.Count > 0 && ajax[ajax.Count - 1] == "1",
                lang: lang,
                title: $"- {languageHelper.Translate(lang, "Route")} - {id}",
                content: "~/Views/Routes/Route.cshtml",
                contentData: new RouteModel
                {
                    Id = id
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

        public IActionResult List(string? lang)
        {
            lang = languageHelper.CheckLanguage(HttpContext, lang);

            var ajax = Request.Query["ajax"];

            var viewData = viewHelper.Render(
                ajax: ajax.Count > 0 && ajax[ajax.Count - 1] == "1",
                lang: lang,
                title: $"- {languageHelper.Translate(lang, "Routes")}",
                content: "~/Views/Routes/Route.cshtml",
                contentData: new RouteModel {},
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
