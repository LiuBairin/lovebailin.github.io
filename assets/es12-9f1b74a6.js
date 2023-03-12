import{d as p,o as t,c as o,a as c,b as e,_ as u}from"./app-6cb5fdbe.js";import{B as l}from"./BlTitle-e6ef2f67.js";const k={class:"write markdown-body"},i=e(`<h2 id="es2022(es13)%E6%96%B0%E7%89%B9%E6%80%A7%E8%A7%A3%E8%AF%BB" tabindex="-1">ES2022(ES13)新特性解读</h2><h3 id="class-fields" tabindex="-1">Class Fields</h3><h3 id="class-public-instance-fields-%E5%85%AC%E5%85%B1%E5%AE%9E%E4%BE%8B%E5%AD%97%E6%AE%B5" tabindex="-1">Class Public Instance Fields 公共实例字段</h3><p>在 ES6 的类中，我们想定义一个默认值，只能通过 constructor 里面定义：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_num <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>现在我们可以这样：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  _num <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>
</code></pre><p>是不是感觉很熟悉？是的，我在 Node.js v12 就用了，但是现在才进到标准中。</p><p>当然也可以不初始化，默认就是 <code class="">undefined</code>。</p><h3 id="private-instance-fields-%E7%A7%81%E6%9C%89%E5%AE%9E%E4%BE%8B%E5%AD%97%E6%AE%B5" tabindex="-1">Private Instance Fields 私有实例字段</h3><p>原来的类实例的所有字段都可以被访问和修改：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  _num <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>_num<span class="token punctuation">)</span> <span class="token comment">// 0</span>
</code></pre><p><code class="">_num</code> 是一些约定成俗表示私有的用法，但是并不能阻止该被访问和修改，防君子不防小人。</p><p>现在可以通过 # 前缀来表示私有，当我们访问或者修改时就会抛出错误：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  #num <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>#num<span class="token punctuation">)</span> <span class="token comment">// Uncaught SyntaxError: Private field &#39;#num&#39; must be declared in an enclosing class</span>
</code></pre><h3 id="private-instance-methods-and-accessors-%E7%A7%81%E6%9C%89%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%E5%92%8C%E8%AE%BF%E9%97%AE%E5%99%A8" tabindex="-1">Private instance methods and accessors 私有实例方法和访问器</h3><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  #num

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>#getNum<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#initNum <span class="token operator">=</span> <span class="token number">0</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>#getNum<span class="token punctuation">)</span> <span class="token comment">// 0</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">#getNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#num
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">#initNum</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#num <span class="token operator">=</span> num
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>#initNum<span class="token punctuation">)</span> <span class="token comment">// VM723:1 Uncaught SyntaxError: Private field &#39;#initNum&#39; must be declared in an enclosing class</span>
</code></pre><h3 id="static-class-fields-and-methods-%E9%9D%99%E6%80%81%E5%85%AC%E5%85%B1%E5%AD%97%E6%AE%B5%E5%92%8C%E6%96%B9%E6%B3%95" tabindex="-1">Static class fields and methods 静态公共字段和方法</h3><p>在新的提案中，我们可以往类添加静态字段和方法，使用 static 关键字声明，这在其他语言非常常见：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  #num <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token keyword">static</span> baseNum <span class="token operator">=</span> <span class="token number">100</span>

  <span class="token comment">// 静态方法可以通过 this 访问静态字段</span>
  <span class="token keyword">static</span> <span class="token function">getDoubleBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>baseNum <span class="token operator">*</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 静态字段和方法通过类本身访问</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span>baseNum<span class="token punctuation">)</span> <span class="token comment">// 100</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span><span class="token function">getDoubleBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 200</span>

<span class="token comment">// 实例不能访问静态字段和方法</span>
<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>baseNum<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
</code></pre><h3 id="private-static-class-fields-and-methods-%E9%9D%99%E6%80%81%E7%A7%81%E6%9C%89%E5%AD%97%E6%AE%B5%E5%92%8C%E6%96%B9%E6%B3%95" tabindex="-1">Private static class fields and methods 静态私有字段和方法</h3><p>静态字段和方法也可以通过 # 前缀来表示私有：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  #num <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token keyword">static</span> #baseNum <span class="token operator">=</span> <span class="token number">100</span>

  <span class="token keyword">static</span> <span class="token function">getDoubleBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#baseNum <span class="token operator">*</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>

  <span class="token function">getBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Counter<span class="token punctuation">.</span>#baseNum
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 私有静态字段不能被直接访问</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span>#baseNum<span class="token punctuation">)</span> <span class="token comment">// Uncaught SyntaxError: Private field &#39;#baseNum&#39; must be declared in an enclosing class</span>
<span class="token comment">// 同类静态方法可以访问私有静态字段</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span><span class="token function">getDoubleBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 200</span>

<span class="token comment">// 实例可以访问同类下的私有静态字段和方法</span>
<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span><span class="token function">getBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 100</span>
</code></pre><h3 id="class-static-block-%E7%B1%BB%E9%9D%99%E6%80%81%E5%88%9D%E5%A7%8B%E5%8C%96%E5%9D%97" tabindex="-1">Class Static Block 类静态初始化块</h3><p>这个提案的也比较熟，Java 语言就有用到，先看个例子：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> running

  <span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token function">doRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>从上面可以看出，<code class="">static {}</code> 很像静态的 <code class="">constructor</code> 。</p><p>它也可以访问修改私有静态字段和方法：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> #baseNum <span class="token operator">=</span> <span class="token number">100</span>

  <span class="token keyword">static</span> <span class="token function">getDoubleBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#baseNum <span class="token operator">*</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#baseNum <span class="token operator">=</span> <span class="token number">200</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span><span class="token function">getDoubleBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 400</span>
</code></pre><p>甚至将私有静态字段暴露出去：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> getBaseNum

<span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> #baseNum <span class="token operator">=</span> <span class="token number">100</span>

  <span class="token keyword">static</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getBaseNum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#baseNum
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getBaseNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 100</span>
</code></pre><h3 id="ergonomic-brand-checks-for-private-fields-%E7%A7%81%E6%9C%89%E5%AD%97%E6%AE%B5%E6%A3%80%E6%9F%A5" tabindex="-1">Ergonomic brand checks for Private Fields 私有字段检查</h3><p>主要是检测一个对象或实例是否存在私有字段或方法：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
  #brand

  <span class="token function">#method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">#getter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">isC</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> #brand <span class="token keyword">in</span> obj <span class="token operator">&amp;&amp;</span> #method <span class="token keyword">in</span> obj <span class="token operator">&amp;&amp;</span> #getter <span class="token keyword">in</span> obj
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h3 id="regexp-match-indices" tabindex="-1">RegExp Match Indices</h3><p>新提案允许我们利用 <code class="">/d</code> 标识符来表示想要匹配字符串的开始和结束索引。举个例子：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> re1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">a+(z)?</span><span class="token regex-delimiter">/</span></span>

<span class="token keyword">const</span> s1 <span class="token operator">=</span> <span class="token string">&#39;xaaaz&#39;</span>
<span class="token keyword">const</span> m1 <span class="token operator">=</span> re1<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// &#39;aaaz&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// &#39;z&#39;</span>
</code></pre><p>在此之前我们并不能完成知道所以匹配的字符在目标字符串的位置，现在通过 <code class="">/d</code> 标识符，匹配结果会多出一个属性 <code class="">.indices</code>：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> re1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">a+(z)?</span><span class="token regex-delimiter">/</span><span class="token regex-flags">d</span></span>

<span class="token keyword">const</span> s1 <span class="token operator">=</span> <span class="token string">&#39;xaaaz&#39;</span>
<span class="token keyword">const</span> m1 <span class="token operator">=</span> re1<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span>indices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// [1, 5]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">...</span>m1<span class="token punctuation">.</span>indices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;aaaz&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span>indices<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// [4, 5]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">...</span>m1<span class="token punctuation">.</span>indices<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;z&#39;</span>
</code></pre><p>还可以添加命名组，如 <code class="">?&lt;Z&gt;</code>：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> re1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">a+(?&lt;Z&gt;z)?</span><span class="token regex-delimiter">/</span><span class="token regex-flags">d</span></span>

<span class="token keyword">const</span> s1 <span class="token operator">=</span> <span class="token string">&#39;xaaaz&#39;</span>
<span class="token keyword">const</span> m1 <span class="token operator">=</span> re1<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span>groups<span class="token punctuation">.</span><span class="token constant">Z</span><span class="token punctuation">)</span> <span class="token comment">// &#39;z&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">.</span>indices<span class="token punctuation">.</span>groups<span class="token punctuation">.</span><span class="token constant">Z</span><span class="token punctuation">)</span> <span class="token comment">// [4, 5]</span>
</code></pre><h3 id="top-level-await" tabindex="-1">Top-level <code class="">await</code></h3><p>该提案可以让 <code class="">await</code> 提升到模块中，不需要和 <code class="">async</code> 强绑定了，在此之前：</p><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// awaiting.mjs</span>
<span class="token keyword">let</span> output
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  output <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> output <span class="token punctuation">}</span>
</code></pre><p>如果我们要引用 output 值：</p><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// usage.mjs</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> output <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./awaiting.mjs&quot;</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span><span class="token punctuation">;</span>                         <span class="token comment">// undefined</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>output<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 100</span>
</code></pre><p>很明显，我们不能立即引用到异步的值，所以大部分情况我们会引用一个返回异步调用的方法来解决问题，如：</p><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// compiler.mjs</span>
<span class="token keyword">let</span> vueCompiler
<span class="token keyword">const</span> <span class="token function-variable function">getVueCompiler</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vueCompiler<span class="token punctuation">)</span> <span class="token keyword">return</span> vueCompiler
  vueCompiler <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@vue/compiler-sfc&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> vueCompiler
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> getVueCompiler <span class="token punctuation">}</span>

<span class="token comment">// usage.mjs</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getVueCompiler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./compiler.mjs&#39;</span>

<span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getVueCompiler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><p>在顶层 <code class="">await</code> 加持下，我们可以：</p><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// awaiting.mjs</span>
<span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> output <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// usage.mjs</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> output <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./awaiting.mjs&quot;</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span><span class="token punctuation">;</span>                         <span class="token comment">// 100</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>output<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 100</span>
</code></pre><p>可以看到， await 不需要在 async 函数中使用了，我们引用模块的可以等待 ESM 模块异步执行完毕在去执行。</p><h3 id=".at()" tabindex="-1"><code class="">.at()</code></h3><p>我们要访问数组某一项，通常是这么做：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><p>从上面可以看出，访问前面的数组还好，倒过来访问就略显难受，特别是数组动态算出来的，比如：</p><pre class="language-javascript"><code class="language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 4</span>
</code></pre><p>上面这种情况，我们不得不用一个变量存起来。</p><p>新增 <code class="">Array.prototype.at</code> 就可以解决问题，这个跟 <code class="">String.prototype.at</code> 用法基本一致。</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 3</span>
<span class="token comment">// ↓↓</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">at</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// 3</span>

<span class="token comment">// 动态算出来也能变得简洁</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 4</span>
<span class="token comment">// ↓↓</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">at</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><h3 id="accessible-object.prototype.hasownproperty" tabindex="-1">Accessible <code class="">Object.prototype.hasOwnProperty</code></h3><p>我记得最早的时候，我们要遍历一个对象，会这么写：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> k <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取可枚举对象</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>后续这么使用 eslint 就会弹出提示：</p><pre class="language-csharp"><code class="language-csharp">Do <span class="token keyword">not</span> access Object<span class="token punctuation">.</span>prototype method &#39;hasOwnProperty&#39; <span class="token keyword">from</span> target <span class="token keyword">object</span><span class="token punctuation">.</span>
</code></pre><p>这是一个不安全的行为，比如 <code class="">{&quot;hasOwnProperty&quot;: 1}</code>，可能会导致服务器崩溃。</p><p>为了解决问题，我们改成这样：</p><pre class="language-javascript"><code class="language-javascript"><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
</code></pre><p>这样就可以避免访问目标对象 Object 原型方法。</p><p>来到重点了，新的提案简化了：</p><pre class="language-javascript"><code class="language-javascript"><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// ↓↓</span>
Object<span class="token punctuation">.</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
</code></pre><h3 id="error-cause" tabindex="-1">Error Cause</h3><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getSolution</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> rawResource <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;//domain/resource-a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 平时我们要抛出错误有以下几种方式：</span>
    <span class="token comment">// 1. throw new Error(&#39;Download raw resource failed: &#39; + err.message);</span>
    <span class="token comment">// 2. const wrapErr = new Error(&#39;Download raw resource failed&#39;);</span>
    <span class="token comment">//    wrapErr.cause = err;</span>
    <span class="token comment">//    throw wrapErr;</span>
    <span class="token comment">// 3. class CustomError extends Error {</span>
    <span class="token comment">//      constructor(msg, cause) {</span>
    <span class="token comment">//        super(msg);</span>
    <span class="token comment">//        this.cause = cause;</span>
    <span class="token comment">//      }</span>
    <span class="token comment">//    }</span>
    <span class="token comment">//    throw new CustomError(&#39;Download raw resource failed&#39;, err);</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> jobResult <span class="token operator">=</span> <span class="token function">doComputationalHeavyJob</span><span class="token punctuation">(</span>rawResource<span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;//domain/upload&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">body</span><span class="token operator">:</span> jobResult <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">await</span> <span class="token function">doJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// =&gt; TypeError: Failed to fetch</span>
</code></pre><p>举个例子：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getSolution</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> rawResource <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;//domain/resource-a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 平时我们要抛出错误有以下几种方式：</span>
    <span class="token comment">// 1. throw new Error(&#39;Download raw resource failed: &#39; + err.message);</span>
    <span class="token comment">// 2. const wrapErr = new Error(&#39;Download raw resource failed&#39;);</span>
    <span class="token comment">//    wrapErr.cause = err;</span>
    <span class="token comment">//    throw wrapErr;</span>
    <span class="token comment">// 3. class CustomError extends Error {</span>
    <span class="token comment">//      constructor(msg, cause) {</span>
    <span class="token comment">//        super(msg);</span>
    <span class="token comment">//        this.cause = cause;</span>
    <span class="token comment">//      }</span>
    <span class="token comment">//    }</span>
    <span class="token comment">//    throw new CustomError(&#39;Download raw resource failed&#39;, err);</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> jobResult <span class="token operator">=</span> <span class="token function">doComputationalHeavyJob</span><span class="token punctuation">(</span>rawResource<span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;//domain/upload&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">body</span><span class="token operator">:</span> jobResult <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">await</span> <span class="token function">doJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// =&gt; TypeError: Failed to fetch</span>
</code></pre><p>在新的提案中，加入了 cause 来收集原因，规范化整个错误抛出和收集：</p><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">doJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> rawResource <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;//domain/resource-a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 抛出一个低等级错误err，可以通过 cause 包装成高等级错误 Error</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;Download raw resource failed&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">cause</span><span class="token operator">:</span> err <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> jobResult <span class="token operator">=</span> <span class="token function">doComputationalHeavyJob</span><span class="token punctuation">(</span>rawResource<span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;//domain/upload&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&#39;POST&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">body</span><span class="token operator">:</span> jobResult <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>
    <span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;Upload job result failed&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">cause</span><span class="token operator">:</span> err <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">doJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Caused by&#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>cause<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// Error: Upload job result failed</span>
<span class="token comment">// Caused by TypeError: Failed to fetch</span>
</code></pre>`,76),b={title:"ES2022(ES13)新特性解读",date:1678536557e3,category:["ecma","js"]},E="",r=p({__name:"es12",setup(m,{expose:n}){const s="ES2022(ES13)新特性解读",a=["ecma","js"];return n({frontmatter:{title:"ES2022(ES13)新特性解读",date:1678536557e3,category:["ecma","js"]},excerpt:void 0}),(g,w)=>(t(),o("div",k,[c(l,{title:s,date:1678536557e3,category:a}),i]))}}),h=u(r,[["__file","C:/Users/44513/Desktop/blog/docs/ecma/es12.md"]]);export{h as default,E as excerpt,b as frontmatter};
