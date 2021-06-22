package com.github.thepyprogrammer.intellijnotedown.services

import com.github.thepyprogrammer.intellijnotedown.MyBundle
import com.intellij.openapi.project.Project

class MyProjectService(project: Project) {

    init {
        println(MyBundle.message("projectService", project.name))
    }
}
