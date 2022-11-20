using AzizkaDotNetI18n.Options;

namespace DotnetMnemoScheme.Translations
{
    public class Kk: DataOptions
    {
        public Kk()
        {
            Values = new Dictionary<string, object>
            {
                { "CDC", "ДБО" },
                { "Almaty", "Алматы" },
                { "Karaganda", "Қарағанды" },
                { "Routes", "Маршруттар" },
                { "Route", "Маршрут" }
            };
        }
    }
}
