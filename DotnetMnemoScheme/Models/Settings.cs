using System.Text.Json;
using System.Text.Json.Serialization;

using AzizkaDotNetI18n;

using DotnetMnemoScheme.Translations;

namespace DotnetMnemoScheme.Models
{
    public class Settings
    {
        [JsonPropertyName(name: "pageRoot")]
        public string PageRoot { get; protected set; }

        [JsonPropertyName(name: "defaultLanguage")]
        public string DefaultLanguage { get; protected set; }

        [JsonPropertyName(name: "languages")]
        public Dictionary<string, LanguageInfo> Languages { get; protected set; }

        [JsonPropertyName(name: "bundleVersion")]
        public string BundleVersion { get; protected set; }
        
        [JsonPropertyName(name: "langRoute")]
        public string LangRoute { get; protected set; }

        public Settings(IConfiguration config)
        {
            // TODO: Need to change
            PageRoot = "/";
            BundleVersion = GetBundleVersion();
            DefaultLanguage = config["DefaultLanguage"] ?? "kk";            

            Languages = new Dictionary<string, LanguageInfo>
            {
                { 
                    "kk", 
                    new LanguageInfo 
                    {
                        Image = "images/flags/kk.svg",
                        Label = "Қазақша",
                        ShortLabel = "Қаз",
                        Translator = Translator.Create(new Kk())
                    } 
                }, 
                { 
                    "ru", 
                    new LanguageInfo {
                        Image = "images/flags/ru.svg",
                        Label = "Русский",
                        ShortLabel = "Рус",
                        Translator = Translator.Create(new Ru())
                    } 
                }, 
                { 
                    "en", 
                    new LanguageInfo {
                        Image = "images/flags/en.svg",
                        Label = "English",
                        ShortLabel = "Eng",
                        Translator = Translator.Create(new En())
                    } 
                }
            };

            LangRoute = $"^({string.Join("|", Languages.Select(item => item.Key))})";
        } 
        
        protected string GetBundleVersion()
        {
            using var fileStream = File.OpenRead(Path.Combine(Environment.CurrentDirectory, "ClientApp", "package.json"));

            var packageData = JsonSerializer.Deserialize<JsPackage>(fileStream);

            return packageData?.Version ?? "1.0.0";
        }
    }
}
