using DotnetMnemoScheme.Models;

namespace DotnetMnemoScheme.ViewModels.Layouts
{
    public class DefaultLayoutModel
    {
        public string Title { get; set; } = "";

        public string Lang { get; set; } = "";

        public string? Content { get; set; } = null;

        public object? ContentData { get; set; } = null;
    }
}
