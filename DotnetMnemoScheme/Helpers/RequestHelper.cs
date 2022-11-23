using System.Text.RegularExpressions;

using Microsoft.Extensions.Primitives;

using DotnetMnemoScheme.Models;

namespace DotnetMnemoScheme.Helpers;

public class RequestHelper
{
    protected Settings settings;

    protected StringHelper stringHelper;

    public RequestHelper(Settings settings, StringHelper stringHelper)
    {
        this.settings = settings;

        this.stringHelper = stringHelper;
    }
    
    public string Fragment(string path, string root)
    {
        if (root != "/")
        {
            var regex = new Regex(root);
            path = regex.Replace(path, "", 1);
        }

        return path.Trim('/');
    }

    public string GetQueryParameters(HttpContext httpContext)
    {
        return $"{httpContext.Request.Path}?{GetQueryParameters(httpContext.Request.Query)}";
    }

    public string GetQueryParameters(IQueryCollection query)
    {
        return GetQueryParameters
        (
            query.ToDictionary(
                item => item.Key, 
                item => item.Value
            )
        );
    }

    public string GetQueryParameters(Dictionary<string, StringValues> query)
    {
        return string.Join
        (
            "&",
            query.Select(item =>
            {
                if (query[item.Key] != StringValues.Empty)
                {
                    return $"{item.Key}={stringHelper.StringValuesToString(item.Value)}";
                }
                else
                {
                    return item.Key;
                }
            })
        );
    }
    
    public string SetQueryParameter(HttpContext httpContext, string key, StringValues values)
    {
        return $"{httpContext.Request.Path}?{SetQueryParameter(httpContext.Request.Query, key, values)}";        
    }

    public string SetQueryParameter(IQueryCollection query, string key, StringValues values)
    {
        var data = query.ToDictionary(
            item => item.Key,
            item => item.Value
        );

        return SetQueryParameter(data, key, values);
    }
    
    public string SetQueryParameter(Dictionary<string, StringValues> data, string key, StringValues values)
    {
        data[key] = values;

        return GetQueryParameters(data);
    }

    public string ToggleQueryParameter(HttpContext httpContext, string key)
    {
        return $"{httpContext.Request.Path}?{ToggleQueryParameter(httpContext.Request.Query, key)}";
    }

    public string ToggleQueryParameter(IQueryCollection query, string key)
    {
        var data = query.ToDictionary(
            item => item.Key,
            item => item.Value
        );

        return ToggleQueryParameter(data, key);
    }

    public string ToggleQueryParameter(Dictionary<string, StringValues> data, string key)
    {
        if (data.ContainsKey(key))
        {
            data.Remove(key);

            return GetQueryParameters(data);
        }

        return SetQueryParameter(data, key, new StringValues("1"));
    }

    public string ChangeLangPath(string url, string lang)
    {
        url = url.Trim('/');

        if (!Regex.IsMatch(url, settings.LangRoute))
        {
            return $"{lang}/{url}";
        }

        return Regex.Replace(url, settings.LangRoute, lang);
    }

    public string ChangeLangPath(HttpContext httpContext, string lang)
    {
        return ChangeLangPath(httpContext.Request.Path, lang) +
               "?" +
               GetQueryParameters(httpContext.Request.Query);
    }
    
    public string SetCityPath(string lang, string city)
    {
        return $"{lang}/{city}";
    }

    public string SetCityPath(string lang, string city, IQueryCollection query)
    {
        return $"{SetCityPath(lang, city)}?{GetQueryParameters(query)}";
    }

    public string SetRoutesRangePath(string lang, string city, string range)
    {
        return $"{SetCityPath(lang, city)}/{range}";
    }

    public string SetRoutesRangePath(string lang, string city, string range, IQueryCollection query)
    {
        return $"{SetRoutesRangePath(lang, city, range)}?{GetQueryParameters(query)}";
    }

    public string SetRoutePath(string lang, string city, string range, string type, int id)
    {
        return $"{SetRoutesRangePath(lang, city, range)}/{type}/{id}";
    }

    public string SetRoutePath(string lang, string city, string range, string type, int id, IQueryCollection query)
    {
        return $"{SetRoutePath(lang, city, range, type, id)}?{GetQueryParameters(query)}";
    }
}