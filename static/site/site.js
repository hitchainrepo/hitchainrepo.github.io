;
var CTX_ROOT=window["CTX_ROOT"]||"";
var DOC_ROOT=window["DOC_ROOT"]||"";
$(document).ready(function(){
    {
        loadTemplate($("header"), DOC_ROOT+"site/header.html");
        loadTemplate($("footer"), DOC_ROOT+"site/footer.html");
    }
    sectionNavh2h3();
    bindLoadContent();
});
function sectionNavh2h3(){
    var el = $("#sectionNavh2h3");
    if(el.length < 1){
        return;
    }
    var hs = $("main > h2, main > h3");
    if(hs.length < 1){
        return;
    }
    var content=['<ul class="section-nav">'];
    var h3Count = 0;
    hs.each(function(){
        var id=$(this).attr("id");
        if(id){
            if($(this).is("h2")){
                if(h3Count>0){// end h3 ul
                    content.push('</ul>');
                    content.push('</li>');// end h2 li
                }
                h3Count = 0;
                // start h2 li
                content.push('<li class="toc-entry toc-h2"><a href="#'+id+'">'+$(this).find("span").text()+'</a>');
            }else if($(this).is("h3")){
                if(h3Count==0){// start h3 ul
                    content.push('<ul>');
                }
                content.push('<li class="toc-entry toc-h3"><a href="#'+id+'">'+$(this).find("span").text()+'</a></li>');
                h3Count = h3Count+1;
            }
        }
    });
    if(h3Count>0){// end h3 ul
        content.push('</ul>');
        content.push('</li>');// end h2 li
    }
    content.push('</ul>');
    el.empty().append(content.join("\n"));
}
function bindLoadContent(){
    $(".container-fluid").on("click", "a.loadable", function(event){
        event.preventDefault();
        var href = $(event.target).attr("href")||"";
        if(href.startsWith("/")){
            href = href.substring(1);
            loadTemplate($(".container-fluid main"), DOC_ROOT+href, true);
            return;
        }
        loadTemplate($(".container-fluid main"), href, true);
    });
}
function loadTemplate($el, href, updateNav){
    $.ajax({
        url: href+"?_="+new Date().getTime(),
        dataType: "text"
    }).done(function(data) {
        var tpl = Template(data);
        tpl.render({"context": CTX_ROOT, "docRoot": DOC_ROOT}, function(output){
            $el.empty().append(output);
        });
        if(updateNav === true){
            sectionNavh2h3();
        }
    });
}

var hit_versions = [
    {version: "0.0.3", url: "docs/0.0.3/index.html"},
    {version: "0.0.2", url: "docs/0.0.2/index.html"},
    {version: "0.0.1", url: "docs/0.0.1/index.html"}
];