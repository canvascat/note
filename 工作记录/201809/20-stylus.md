# stylus

## Stylus安装
```bash
$ npm install stylus -g
```

## 使用
```bash
stylus [options] [< in [> out]]
```
```bash
 Options:

    -i, --interactive       Start interactive REPL
    -u, --use <path>        Utilize the Stylus plugin at <path>
    -U, --inline            Utilize image inlining via data URI support
    -w, --watch             Watch file(s) for changes and re-compile
    -o, --out <dir>         Output to <dir> when passing files
    -C, --css <src> [dest]  Convert CSS input to Stylus
    -I, --include <path>    Add <path> to lookup paths
    -c, --compress          Compress CSS output
    -d, --compare           Display input along with output
    -f, --firebug           Emits debug infos in the generated CSS that
                            can be used by the FireStylus Firebug plugin
    -l, --line-numbers      Emits comments in the generated CSS
                            indicating the corresponding Stylus line
    -m, --sourcemap         Generates a sourcemap in sourcemaps v3 format
    --sourcemap-inline      Inlines sourcemap with full source text in base64 format
    --sourcemap-root <url>  "sourceRoot" property of the generated sourcemap
    --sourcemap-base <path> Base <path> from which sourcemap and all sources are relative
    -P, --prefix [prefix]   prefix all css classes
    -p, --print             Print out the compiled CSS
    --import <file>         Import stylus <file>
    --include-css           Include regular CSS on @import
    -D, --deps              Display dependencies of the compiled file
    --disable-cache         Disable caching
    --hoist-atrules         Move @import and @charset to the top
    -r, --resolve-url       Resolve relative urls inside imports
    --resolve-url-nocheck   Like --resolve-url but without file existence check
    -V, --version           Display the version of Stylus
    -h, --help              Display help information
```

### 生成CSS

```bash
$ stylus --compress src/ # 将src/下的所有.styl编译为压缩后的.css文件
$ stylus --css css/example.css css/out.styl # CSS转换成styl 
$ stylus --css test.css # 输出基本名一致的.styl文件
```