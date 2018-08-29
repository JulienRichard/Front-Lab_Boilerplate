import './styles.scss'

(function () {
  let template = `
    <div id="devtools" class="dev-tools">
      <div id="devtools-grids"></div>
      <div id="devtools-baseline"></div>

      <div class="dev-panel">
        <div class="dev-panel--buttons">
          <button id="btn-toggle-global-grid" class="button-icon is-tiny is-rounded">
            <i class="icon fas fa-th-large"></i>
          </button>
          <button id="btn-toggle-wrapper-grid" class="button-icon is-tiny is-rounded">
            <i class="icon fas fa-th"></i>
          </button>
          <button id="btn-toggle-baseline" class="button-icon is-tiny is-rounded">
            <i class="icon fas fa-ruler-vertical"></i>
          </button>
        </div>

        <div class="dev-panel--screen-sizes">
          <span class="show-for-small-only">
            <div class="tag is-rounded">Small screen</div>
          </span>
          <span class="show-for-medium-only">
            <div class="tag is-rounded">Medium screen</div>
          </span>
          <span class="show-for-large-only">
            <div class="tag is-rounded">Large screen</div>
          </span>
          <span class="show-for-xlarge-only">
            <div class="tag is-rounded">x-Large screen</div>
          </span>
          <span class="show-for-xxlarge-only">
            <div class="tag is-rounded">xx-Large screen</div>
          </span>
          <span id="window-size" class="tag is-rounded"></span>
        </div>
      </div>
    </div>
  `
  class DevTools extends HTMLElement {
    createdCallback () {
      // Template
      this.outerHTML = template

      // Containers
      let $gridBlock = document.getElementById('devtools-grids')
      let $baselineBlock = document.getElementById('devtools-baseline')

      // Buttons
      let $btnToggleBaseline = document.getElementById('btn-toggle-baseline')
      let $btnToggleGlobalGrid = document.getElementById('btn-toggle-global-grid')
      let $btnToggleWrapperGrid = document.getElementById('btn-toggle-wrapper-grid')

      // Window Size
      let $windowSize = document.getElementById('window-size')

      // -- Show Window Size
      function resize () {
        $windowSize.innerHTML = window.innerWidth + ' x ' + window.innerHeight
      }

      $windowSize.innerHTML = window.innerWidth + ' x ' + window.innerHeight
      window.onresize = resize

      // -- Toggle Baseline
      $btnToggleBaseline.addEventListener('click', function () {
        this.classList.toggle('is-active')
        $baselineBlock.classList.toggle('show-baseline')
      }, false)

      // -- Toggle Global Grid
      $btnToggleGlobalGrid.addEventListener('click', function () {
        this.classList.toggle('is-active')

        if ($gridBlock.classList.contains(['show-global-grid'])) {
          $gridBlock.classList.remove('show-global-grid')
        } else {
          $gridBlock.classList.add('show-global-grid')

          if ($gridBlock.classList.contains('show-wrapper-grid')) {
            $gridBlock.classList.remove('show-wrapper-grid')
            $btnToggleWrapperGrid.classList.remove('is-active')
          }
        }
      }, false)

      // -- Toggle Wrapper Grid
      $btnToggleWrapperGrid.addEventListener('click', function () {
        this.classList.toggle('is-active')

        if ($gridBlock.classList.contains('show-wrapper-grid')) {
          $gridBlock.classList.remove('show-wrapper-grid')
        } else {
          $gridBlock.classList.add('show-wrapper-grid')

          if ($gridBlock.classList.contains('show-global-grid')) {
            $gridBlock.classList.remove('show-global-grid')
            $btnToggleGlobalGrid.classList.remove('is-active')
          }
        }
      }, false)
    }
  }

  // Init custom component
  document.registerElement('dev-tools', DevTools)
})()
