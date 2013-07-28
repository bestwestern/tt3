using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Serialization;

namespace tt3csharp
{
    public partial class Default : System.Web.UI.Page
    {
        [Serializable()]
        public class TestClass
        {
            private string someString;
            public string SomeString
            {
                get { return someString; }
                set { someString = value; }
            }

            private List<string> settings = new List<string>();
            public List<string> Settings
            {
                get { return settings; }
                set { settings = value; }
            }

            // These will be ignored
            [NonSerialized()]
            private int willBeIgnored1 = 1;
            private int willBeIgnored2 = 1;

        }
        protected void Page_Load(object sender, EventArgs e)
        {
            TestClass TestObj = new TestClass();

            // Set some dummy values
            TestObj.SomeString = "foo";

            TestObj.Settings.Add("A");
            TestObj.Settings.Add("B");
            TestObj.Settings.Add("C");



            // Create a new XmlSerializer instance with the type of the test class
            XmlSerializer SerializerObj = new XmlSerializer(typeof(TestClass));

            // Create a new file stream to write the serialized object to a file
            TextWriter WriteFileStream = new StreamWriter(Server.MapPath("~/test.xml"));
            SerializerObj.Serialize(WriteFileStream, TestObj);

            // Cleanup
            WriteFileStream.Close();
        }
    }
}