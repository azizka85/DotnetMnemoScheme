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

        public LayoutHandlerOutput Render
        (
            bool ajax,
            int? id,
            string city,
            string? range,
            string? type,
            string lang, 
            string? title, 
            string content, 
            object contentData, 
            List<string>? layouts = null
        ) {
            if(layouts?.Count > 0)
            {
                var layoutHandlers = GetLayoutHandlers(layouts);

                foreach(var layoutHandler in layoutHandlers)
                {
                    var handler = layoutHandler.Handler;

                    var result = handler(
                        new LayoutHandlerInput
                        {
                            Id = id,
                            City = city,
                            Range = range,
                            Type = type,
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
                        Id = id,
                        City = city,
                        Type = type,
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

        protected LayoutHandlerOutput DefaultLayoutHandler(string? title, LayoutHandlerInput input)
        {
            return new LayoutHandlerOutput
            {
                Content = "~/Views/Layouts/DefaultLayout.cshtml",
                ContentData = new DefaultLayoutModel
                {
                    Id = input.Id,
                    City = input.City,
                    Type = input.Type,
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
                    Id = input.Id,
                    City = input.City,
                    Range = input.Range,
                    Type = input.Type,
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
