using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;

namespace tt4
{
    public partial class Default : System.Web.UI.Page
    {//NetherlandsKottenpark2009
        protected void Page_Load(object sender, EventArgs e)
        {
            if (false)
            {
                XDocument xDoc = XDocument.Load(Server.MapPath("~/xml/NetherlandsKottenpark2009.xml"));
                IEnumerable<XElement> HighSchoolTimetableArchive = xDoc.Elements();
                XElement r = xDoc.Root;
                var children = HighSchoolTimetableArchive.Elements();
                XElement firstSpecificChildElement = children.ElementAt<XElement>(1);
                XElement specificChildElement = r.Element("SolutionGroups");
                var newElement = new XElement("Id", "0", new XElement("Balanace", "3000"));
                //     xDoc.Root.Add(newElement);
                specificChildElement.Add(newElement);
                xDoc.Save(Server.MapPath("~/test2.xml"));
            }
            /*    XNamespace empNM = "urn:lst-emp:emp";
                   XDocument xDoc = new XDocument(
                   new XDeclaration("1.0", "UTF-16", null),
                   new XElement(empNM + "Employees",
                       new XElement("Employee",
                           new XComment("Only 3 elements for demo purposes"),
                           new XElement("EmpId", "5"),
                           new XElement("Name", "Kimmy"),
                           new XElement("Sex", "Female")
                           )));

                   StringWriter sw = new StringWriter();
                   XmlWriter xWrite = XmlWriter.Create(sw);
                   xDoc.Save(xWrite);
                   xWrite.Close();

                   // Save to Disk
                   xDoc.Save(Server.MapPath("~/test2.xml"));*/
        }
        [System.Web.Services.WebMethod(EnableSession = true)]
        public static int savesolution(object sol)
        {

            return -1;
        }
    }
}