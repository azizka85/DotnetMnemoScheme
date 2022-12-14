namespace DotnetMnemoScheme.ViewModels.Layouts
{
    public class MainLayoutModel
    {
        public int? Id { get; set; } = null;

        public string City { get; set; } = "";

        public string? Range { get; set; } = null;
        
        public string? Type { get; set; } = null;
        
        public string Lang { get; set; } = "";

        public string? Content { get; set; } = null;

        public object? ContentData { get; set; } = null;
    }
}
