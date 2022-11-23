namespace DotnetMnemoScheme.ViewModels.Layouts
{
    public class LayoutHandlerInput: LayoutHandlerOutput
    {
        public int? Id { get; set; } = null;

        public string City { get; set; } = "";

        public string? Range { get; set; } = null;
        
        public string? Type { get; set; } = null;
        
        public string Lang { get; set; } = "";    
    }
}
