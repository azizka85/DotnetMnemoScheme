using System.Net;

using Microsoft.AspNetCore.Http.Extensions;

using AzizkaDotNetI18n.Options;

using DotnetMnemoScheme.Exceptions;
using DotnetMnemoScheme.Models;

namespace DotnetMnemoScheme.Helpers
{
    public class LanguageHelper
    {
        protected Settings settings;

        public LanguageHelper(Settings settings)
        {
            this.settings = settings;
        }

        public string CheckLanguage(HttpContext httpContext, string? lang)
        {
            lang = lang ?? settings.DefaultLanguage;

            if (!settings.Languages.ContainsKey(lang))
            {
                throw new WebApiException
                (
                    statusCode: HttpStatusCode.NotFound,
                    method: httpContext.Request.Method,
                    url: httpContext.Request.GetEncodedUrl(),
                    message: $"Content for the language {lang} not found"
                );
            }

            return lang;
        }

        public DataOptions? GetDataOptions(HttpContext httpContext, string? lang)
        {
            lang = CheckLanguage(httpContext, lang);

            return settings.Languages[lang].Translator.Data;
        }

        public string Translate(string lang, string text)
        {
            return settings.Languages[lang].Translator.Translate(text);
        }

        public string Translate(string lang, string text, int num)
        {
            return settings.Languages[lang].Translator.Translate(text, num);
        }

        public string Translate(string lang, string text, Dictionary<string, string> formatting)
        {
            return settings.Languages[lang].Translator.Translate(text, formatting);
        }

        public string Translate(string lang, string text, int num, Dictionary<string, string> formatting)
        {
            return settings.Languages[lang].Translator.Translate(text, num, formatting);
        }

        public string Translate(string lang, string text, Dictionary<string, string> formatting, Dictionary<string, string> context)
        {
            return settings.Languages[lang].Translator.Translate(text, formatting, context);
        }

        public string Translate(string lang, string text, int num, Dictionary<string, string> formatting, Dictionary<string, string> context)
        {
            return settings.Languages[lang].Translator.Translate(text, num, formatting, context);
        }
    }
}
