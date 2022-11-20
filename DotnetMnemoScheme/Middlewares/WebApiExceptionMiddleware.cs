using System.Text.Json;

using DotnetMnemoScheme.Exceptions;

namespace DotnetMnemoScheme.Middlewares
{
    public class WebApiExceptionMiddleware
    {
        protected readonly RequestDelegate requestDelegate;
        
        public WebApiExceptionMiddleware(RequestDelegate requestDelegate)
        {
            this.requestDelegate = requestDelegate;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await requestDelegate(httpContext);
            }
            catch(WebApiException e)
            {
                httpContext.Response.ContentType = "application/json;charset=UTF-8";
                httpContext.Response.StatusCode = (int)e.StatusCode;
                
                await httpContext.Response.WriteAsync
                (
                    JsonSerializer.Serialize(
                        new 
                        {
                            url = e.Url,
                            method = e.Method,
                            statusCode = e.StatusCode,
                            message = e.Message
                        }
                    )
                );
            }
        }
    }
}
