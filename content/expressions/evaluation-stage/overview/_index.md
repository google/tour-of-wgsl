---
title: "Overview"
---

There are three key phases in a shader's lifetime (shown in context <a href="#in-context">below</a>):

```mermaid
flowchart LR
   sc[Shader creation time]
   pc[Pipeline creation time]
   rt[Shader execution time]
   sc --> pc --> rt
```

Each phase finalizes the value for expressions in a certain category, as follows:

<table>
<thead><th>Evaluation phase
       <th>Finalizes values for...
       <th>Sub-expressions can be...
<tr><td>Shader creation
    <td>const-expressions
    <td><ul>
        <li>literals,
        <li><tt>@const</tt> function calls,
        <li>const-declared values
        </ul>
<tr><td>Pipeline creation
    <td>override-expressions
    <td>All of the above, plus:
        <ul>
        <li>override-declared values,
        <li>values from
            <a href="https://gpuweb.github.io/gpuweb/#dom-gpuprogrammablestage-constants"
                  >GPUProgrammableStage.constants</a>
        </ul>
<tr><td>Shader execution
    <td>runtime-expressions
    <td>All of the above, plus:
        <ul>
        <li>let-declared values
        <li>any function call,
        <li>variable contents
        <li>reference or pointer to a variable
        </ul>
</table>

<div style="padding:2ex">
<a name=in-context"/>
The shader phases fit into a WebGPU application as follows:

```mermaid
sequenceDiagram
  participant A as App
  participant C as Browser
  note over A,C: Get a GPUAdapter, GPUDevice
  A ->>+C: device.createShaderModule(...)
  activate C
  Note right of C: Shader-creation time
  C -->> A: a GPUShaderModule
  deactivate C
  A ->>C: device.createComputePipeline(...)<br/>or device.createRenderPipeline(...)<br>Provides GPUProgrammablestage.constants
  activate C
  Note right of C: Pipeline-creation time
  C -->> A: a GPUComputePipeline
  deactivate C
  Note over A,C: Create and bind resources,<br>Record GPU commands ...
  %%Note over A,C: Submit commands
  A ->>C: device.queue.submit(...)
  C-->>C: Wait to be scheduled
  activate C
  Note right of C: Shader execution
  A ->> C: device.queue.onSubmittedWorkDone()
  C -->> A: a pending Promise&lt;undefined&gt;
  C -->> A: fulfill Promise
  deactivate C
```
</div>
