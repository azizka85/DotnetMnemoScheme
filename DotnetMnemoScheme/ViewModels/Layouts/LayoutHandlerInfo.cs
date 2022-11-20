namespace DotnetMnemoScheme.ViewModels.Layouts
{
    public class LayoutHandlerInfo
    {
        public string Name { get; set; } = "";

        public Func<LayoutHandlerInput, LayoutHandlerOutput> Handler { get; set; } = (input) => new LayoutHandlerOutput 
        { 
            Content = input.Content,
            ContentData = input.ContentData
        };
    }
}
