(()=>{let e=[];function t(e,t,n,s){this.title=e,this.author=t,this.pages=n,this.hasRead=s}function n(){const t=document.querySelector(".grid");t.replaceChildren();for(let n of e)t.appendChild(s(n))}function s(t){const s=document.createElement("div");s.classList.add("book");const a=document.createElement("div");a.classList.add("title");const d=document.createElement("div");d.classList.add("author");const o=document.createElement("div");o.classList.add("pages");const c=function(t){const s=document.createElement("div");s.classList.add("buttons");const a=function(e){const t=document.createElement("div");return t.classList.add("hasRead","button"),t.textContent=e.hasRead?"Completed":"In Progress",e.hasRead&&t.classList.add("true"),t.addEventListener("click",(()=>{t.classList.toggle("true"),e.toggleHasRead(),t.textContent=e.hasRead?"Completed":"In Progress"})),t}(t);s.appendChild(a);const d=function(){const t=document.createElement("div");return t.classList.add("button","delete"),t.textContent="Delete",t.addEventListener("click",(()=>{const t=event.target.parentElement.parentElement;e.splice(t.getAttribute("data-book-index"),1),n()})),t}();return s.appendChild(d),s}(t),l=[a,d,o];for(let e of l)e.textContent=e==o?`Pages: ${t[e.className]}`:t[e.className],s.appendChild(e);return s.setAttribute("data-book-index",`${e.findIndex((e=>e.title==t.title))}`),s.appendChild(c),s}t.prototype.toggleHasRead=function(){console.log(this.hasRead),this.hasRead=!this.hasRead},e.push(new t("To Kill a Mockingbird","Harper Lee",281,!1),new t("A Game of Thrones","George R.R. Martin",694,!0));const a=document.querySelector("form");a.addEventListener("submit",(s=>{var d;s.preventDefault(),d=new t(a.elements.author.value,a.elements.title.value,a.elements.pages.value,a.elements["has-read"].checked),e.push(d),n(),a.reset()})),n()})();