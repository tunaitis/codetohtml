package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

type theme struct {
	name string
	path string
}

func getThemeList() []theme {
	var themes []theme
	root := "../src/static/codestyles"
	err := filepath.Walk(root, func(path string, info fs.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		name := strings.Replace(info.Name(), ".css", "", -1)
		themes = append(themes, theme{name, path})
		return nil
	})

	if err != nil {
		panic(err)
	}
	return themes
}

func writeThemeJson(themes []theme) {
	file, err := os.Create("../src/_data/themes.json")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	file.WriteString("[\n")
	for _, theme := range themes {
		if themes[len(themes)-1] != theme {
			file.WriteString(fmt.Sprintf("\t\"%s\",\n", theme.name))
		} else {
			file.WriteString(fmt.Sprintf("\t\"%s\"\n", theme.name))
		}
	}
	file.WriteString("]")
}

func writeThemeStylesheet(themes []theme) {
	file, err := os.Create("../src/assets/styles/themes.scss")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	file.WriteString("// auto-generated file, do not edit\n")
	file.WriteString("@use \"sass:meta\";\n\n")

	for _, theme := range themes {
		file.WriteString(fmt.Sprintf(".theme-%s {\n", theme.name))
		file.WriteString(fmt.Sprintf("\t@include meta.load-css(\"../../static/codestyles/%s.css\");\n", theme.name))
		file.WriteString("}\n\n")
	}
}

func main() {
	themes := getThemeList()

	writeThemeJson(themes)
	writeThemeStylesheet(themes)
}
