using DotnetMnemoScheme.Models;

namespace DotnetMnemoScheme.ViewModels.Layouts
{
    public class DefaultLayoutModel
    {
        public string? Title { get; set; } = null;

        public int? Id { get; set; } = null;

        public string City { get; set; } = "";

        public string? Type { get; set; } = null;
        
        public string Lang { get; set; } = "";

        public string? Content { get; set; } = null;

        public object? ContentData { get; set; } = null;
    }
}
