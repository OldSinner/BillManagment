using DinkToPdf;

namespace api.Configuration
{
    public static class PdfConfiguration
    {
        public static GlobalSettings ConfigureGlobal()
        {

            GlobalSettings globalSettings = new GlobalSettings();
            globalSettings.ColorMode = ColorMode.Color;
            globalSettings.Orientation = Orientation.Portrait;
            globalSettings.PaperSize = PaperKind.A4;
            globalSettings.Margins = new MarginSettings { Top = 25, Bottom = 25 };

            return globalSettings;

        }
        public static ObjectSettings ConfigureObjectSettings(string html)
        {
            HeaderSettings headerSettings = new HeaderSettings();
            headerSettings.FontSize = 12;
            headerSettings.FontName = "Ariel";
            headerSettings.Right = "Strona [page] z [toPage]";
            headerSettings.Line = true;
            FooterSettings footerSettings = new FooterSettings();
            footerSettings.FontSize = 12;
            footerSettings.FontName = "Ariel";
            footerSettings.Center = "Wygenerowano dnia: " + DateTime.Now.ToString();
            footerSettings.Line = true;
            WebSettings webSettings = new WebSettings();
            webSettings.DefaultEncoding = "utf-8";
            ObjectSettings objectSettings = new ObjectSettings();
            objectSettings.PagesCount = true;
            objectSettings.HtmlContent = html;
            objectSettings.HeaderSettings = headerSettings;
            objectSettings.FooterSettings = footerSettings;
            objectSettings.WebSettings = webSettings;

            return objectSettings;

        }
    }
}