using DotnetMnemoScheme.ViewModels.Layouts;

namespace DotnetMnemoScheme.Helpers
{
    public class ViewHelper
    {
        protected readonly Dictionary<string, Func<LayoutHandlerInput, LayoutHandlerOutput>> layoutHandlersMap;

        public ViewHelper()
        {
            layoutHandlersMap = new Dictionary<string, Func<LayoutHandlerInput, LayoutHandlerOutput>>
            {
                { "main-layout", MainLayoutHandler }
            };
        }

        public LayoutHandlerOutput Render(bool ajax, string lang, string title, string content, object contentData, List<string>? layouts = null)
        {
            if(layouts?.Count > 0)
            {
                var layoutHandlers = GetLayoutHandlers(layouts);

                foreach(var layoutHandler in layoutHandlers)
                {
                    var handler = layoutHandler.Handler;

                    var result = handler(
                        new LayoutHandlerInput
                        {
                            Lang = lang,
                            Content = content,
                            ContentData = contentData
                        }
                    );

                    content = result.Content;
                    contentData = result.ContentData;
                }
            }

            if(!ajax)
            {
                var result = DefaultLayoutHandler
                (
                    title: title, 
                    input: new LayoutHandlerInput
                    {
                        Lang = lang,
                        Content = content,
                        ContentData = contentData
                    }
                );

                content = result.Content;
                contentData = result.ContentData;
            }

            return new LayoutHandlerOutput
            {
                Content = content,
                ContentData = contentData
            };
        }

        protected LayoutHandlerOutput DefaultLayoutHandler(string title, LayoutHandlerInput input)
        {
            return new LayoutHandlerOutput
            {
                Content = "~/Views/Layouts/DefaultLayout.cshtml",
                ContentData = new DefaultLayoutModel
                {
                    Title = title,
                    Lang = input.Lang,
                    Content = input.Content,
                    ContentData = input.ContentData
                }
            };
        }

        protected LayoutHandlerOutput MainLayoutHandler(LayoutHandlerInput input)
        {
            return new LayoutHandlerOutput
            {
                Content = "~/Views/Layouts/MainLayout.cshtml",
                ContentData = new MainLayoutModel
                {
                    Lang = input.Lang,
                    Content = input.Content,
                    ContentData = input.ContentData
                }
            };
        }

        protected List<LayoutHandlerInfo> GetLayoutHandlers(List<string> layouts)
        {
            var layoutHandlers = new List<LayoutHandlerInfo>();

            foreach(var layout in layouts)
            {
                if(layoutHandlersMap.ContainsKey(layout))
                {
                    layoutHandlers.Add
                    (
                        new LayoutHandlerInfo
                        {
                            Name = layout,
                            Handler = layoutHandlersMap[layout]
                        }
                    );
                }
            }

            return layoutHandlers;
        }
    }
}
