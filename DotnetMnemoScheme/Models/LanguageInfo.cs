using System.Text.Json.Serialization;

using AzizkaDotNetI18n;

namespace DotnetMnemoScheme.Models
{
    public class LanguageInfo
    {
        [JsonPropertyName(name: "image")]
        public string Image { get; set; } = "";

        [JsonPropertyName(name: "label")]
        public string Label { get; set; } = "";

        [JsonPropertyName(name: "shortLabel")]
        public string ShortLabel { get; set; } = "";

        [JsonIgnore]
        public Translator Translator { get; set; } = new Translator();
    }
}
