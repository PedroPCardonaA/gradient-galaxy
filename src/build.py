import sys, os
targets = [os.path.abspath(a) for a in sys.argv[1:]]
here = os.path.dirname(os.path.abspath(__file__))
os.chdir(here)
t = open('template.html').read()
FILES = ['q1.js','q2.js','q3.js','q4.js','x1.js','x2.js','x3.js','x4.js',
         'q1b.js','q2b.js','q3b.js','q4b.js','q1c.js','q2c.js','q3c.js','q4c.js','q1d.js','q2d.js','q3d.js','q4d.js','guide.js',
         'fix1.js','fix2.js','fix3.js','fix4.js']
qs = "\n".join("// ---- %s ----\n" % f + open(f).read() for f in FILES)
assert t.count('/*__QUESTIONS__*/') == 1 and t.count('/*__FIGS__*/') == 1
out = t.replace('/*__FIGS__*/', open('figs.js').read()).replace('/*__QUESTIONS__*/', qs)
assert out.count('/*__KATEX_CSS__*/') == 1 and out.count('/*__KATEX_JS__*/') == 1
# KaTeX (MIT, see vendor/KATEX-LICENSE.txt) is inlined with base64 woff2 fonts so the app stays a single offline file
out = out.replace('/*__KATEX_CSS__*/', open('vendor/katex.inline.css').read()).replace('/*__KATEX_JS__*/', '/*! KaTeX v0.16.22 | MIT License | https://katex.org */\n' + open('vendor/katex.min.js').read())
for target in targets:
    open(target, 'w').write(out)
open('app.js', 'w').write(out.split('<script>\n"use strict";')[1].split('</script>')[0])
print(len(out), "bytes ->", ", ".join(targets))
