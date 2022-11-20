﻿using AzizkaDotNetI18n.Options;

namespace DotnetMnemoScheme.Translations
{
    public class Ru: DataOptions
    {
        public Ru()
        {
            Values = new Dictionary<string, object>
            {
                { "CDC", "ЦДУ" },
                { "Almaty", "Алматы" },
                { "Karaganda", "Караганда" },
                { "Routes", "Маршруты" },
                { "Route", "Маршрут" }
            };
        }
    }
}