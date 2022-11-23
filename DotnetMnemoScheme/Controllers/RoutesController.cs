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

        public IActionResult List(string? lang, string? city, string? range, string? type, int? id)
        {
            city = city ?? settings.DefaultCity;
            lang = languageHelper.CheckLanguage(HttpContext, lang);

            var ajax = Request.Query["ajax"];

            var viewData = viewHelper.Render(
                ajax: ajax.Count > 0 && ajax[ajax.Count - 1] == "1",
                id: id,
                city: city,
                range: range,
                type: type,
                lang: lang,
                title: null,
                content: "~/Views/Routes/Route.cshtml",
                contentData: new RouteModel
                {
                    Id = id,
                    City = city,
                    Range = range,
                    Type = type,
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
