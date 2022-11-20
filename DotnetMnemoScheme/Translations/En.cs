using AzizkaDotNetI18n.Options;

namespace DotnetMnemoScheme.Translations
{
    public class En: DataOptions
    {
        public En()
        {
            Values = new Dictionary<string, object>
            {
                { "CDC", "CDC" },
                { "Almaty", "Almaty" },
                { "Karaganda", "Karaganda" },
                { "Routes", "Routes" },
                { "Route", "Route" }
            };
        }
    }
}
