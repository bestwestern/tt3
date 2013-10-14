<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="tt4.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Timetabling</title>
    <link rel="stylesheet" href="app.css" type="text/css" />
    <script src="instans.js"></script>
    <script src="solution.js"></script>
    <script src="hoved.js"></script>
    <script src="Scripts/jquery-2.0.3.min.js"></script>
   <!-- <script>
        function CreateXMLDoc() {
            if (document.implementation.createDocument &&
                document.implementation.createDocumentType) {
                var fruitDocType = document.implementation.createDocumentType("fruit", "SYSTEM", "<!ENTITY tf 'tropical fruit'>");
                var xmlDoc = document.implementation.createDocument("", "fruits", fruitDocType);
                for (var i = 0; i < 1000; i++) {
                    var fruitNode = xmlDoc.createElement("fruit");
                    fruitNode.setAttribute("name", "avocado" + i);
                    xmlDoc.documentElement.appendChild(fruitNode);
                }
                var serializer = new XMLSerializer();
                //        window.open('data:text/xml,' + serializer.serializeToString(xmlDoc));
                // alert(serializer.serializeToString(xmlDoc));
            }
            else {
                alert("Your browser does not support this example");
            }
        }

    </script>-->
</head>
<body>
    <span id="filnavn"></span>
    <div id="wrapper">
        <button onclick="genberegn();">Genberegn</button>
        <button onclick="tildeltid0();">Tildel tid[0] til alle tidmangler uden tid</button>
        <button onclick="lavxml();">Lav XML i browser(kører først forrige knap)</button>
        <button onclick="lavxml(true);">Lav XML på serveren(kører først forrige knap)</button>
        
        <button onclick="randomtid();">Tildel tilfældig tid</button>
        <button id="randomresbutton" onclick="randomres();">Tildel tilfældig ressource</button>
        <input type="text" value="29500" id="antalrandomtid" />
        <ul id="results"></ul>

        <div id="content"></div>
    </div>
    <div id="footer">
        hard
        <ul id="hardcon"></ul>
        soft
        <ul id="softcon"></ul>


    </div>

</body>
</html>