using System.Text.Json.Serialization;

namespace DotnetMnemoScheme.Models
{
    public class JsPackage
    {
        [JsonPropertyName(name: "version")]
        public string? Version { get; set; } = null;
    }
}
