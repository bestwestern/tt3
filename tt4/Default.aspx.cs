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
            XDocument xDoc = XDocument.Load(Server.MapPath("~/xml/NetherlandsKottenpark2009.xml"));
            var newElement = new XElement("Id", "0", new XElement("Balanace", "3000"));
            xDoc.Root.Add(newElement); 
            xDoc.Save(Server.MapPath("~/test2.xml"));
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
    }
}