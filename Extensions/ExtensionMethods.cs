using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

namespace Jasper.Extensions
{
    public static class ExtensionMethods
    {
        public static JsonNetResult JsonNet(this Controller controller, object data)
        {
            return new JsonNetResult
            {
                Data = data
            };
        }

        public static JsonNetResult JsonNet(this Controller controller, object data, JsonRequestBehavior behavior)
        {
            return new JsonNetResult
            {
                Data = data,
                JsonRequestBehavior = behavior
            };
        }

        public static JsonNetResult JsonNet(this Controller controller, object data, string contentType)
        {
            return new JsonNetResult
            {
                Data = data,
                ContentType = contentType
            };
        }

        public static JsonNetResult JsonNet(this Controller controller, object data, string contentType, Encoding contentEncoding)
        {
            return new JsonNetResult
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding
            };
        }

        public static JsonNetResult JsonNet(this Controller controller, object data, string contentType, JsonRequestBehavior behavior)
        {
            return new JsonNetResult
            {
                Data = data,
                ContentType = contentType,
                JsonRequestBehavior = behavior
            };
        }

        public static JsonNetResult JsonNet(this Controller controller, object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonNetResult
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior
            };
        }


        public static MvcHtmlString JSMinify(this HtmlHelper helper, string src)
        {
            //parse the config setting to a booean
            bool JSMinify = (string.Compare(ConfigurationManager.AppSettings.Get("JSMinify"), "true", true) == 0);

            //helper to map the server path to url
            var urlHelper = new UrlHelper(helper.ViewContext.RequestContext);

            //string builder
            StringBuilder sb = new StringBuilder();
            sb.Append("<script src=\"");
            sb.Append(urlHelper.Content(src));
            //and ".min" to the file if minify is set to true
            if (JSMinify)
            {
                sb.Append(".min");
            }
            sb.Append(string.Format(".js?c={0}\"></script>", ConfigurationManager.AppSettings.Get("Cache")));

            //render the resulting script tag
            return MvcHtmlString.Create(sb.ToString());
        }

    }
}