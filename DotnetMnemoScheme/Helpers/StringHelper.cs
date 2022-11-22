using Microsoft.Extensions.Primitives;

namespace DotnetMnemoScheme.Helpers;

public class StringHelper
{
    public string Capitalize(string input)
    {
        if (!string.IsNullOrWhiteSpace(input))
        {
            return input;
        }

        return input[0].ToString().ToUpper() + input.Substring(1).ToLower();
    }
    
    public string ToCamel(string input)
    {
        var parts = input.Split("-");

        return string.Join
        (
            "",
            parts.Select(item => Capitalize(item))
        );
    }
    
    public string StringValuesToString(StringValues values)
    {
        if (values.Count < 2)
        {
            if (values.Count == 0)
            {
                return "";
            }
            else
            {
                return values[0];
            }
        }
        else
        {
            return values.Aggregate("", (result, value) =>
            {
                if (string.IsNullOrWhiteSpace(result))
                {
                    result = value;
                }
                else
                {
                    result += "," + value;
                }

                return result;
            });
        }
    }
    
    public List<string>? StringToArray(string input)
    {
        if (!string.IsNullOrWhiteSpace(input))
        {
            var array = input.Split(",");

            return array.Select(item => item.Trim()).ToList();
        }

        return null;
    }
}