enum ExpanderState {
	OPENED = 'Opened',
	CLOSED = 'Closed',
}

const selectors = Object.freeze({
	expander: '.js-expander',
	trigger: '.js-expander__trigger',
});

/**
 * Initialise the Expander module.
 */
function init() {
	_initEvents();

	_closeAll();

	// _openByTarget uses the ':target' CSS pseudo-class, which doesn't
	// match anything immediately on page load. Requesting an animation
	// frame delays things for long enough for it to work.
	requestAnimationFrame(_openByTarget);
}

/**
 * Initialise events for the Expander module.
 */
function _initEvents() {
	// TODO: Use @cipscis/activate
	document.addEventListener('click', _processTriggerClickEvent);

	window.addEventListener('hashchange', _openByTarget);
}

/**
 * If a trigger element is clicked, determine which expander
 * it controls and toggle its state.
 *
 * @param {MouseEvent} e
 */
function _processTriggerClickEvent(e: MouseEvent): void {
	const $target = e.target;

	if ($target instanceof HTMLElement) {
		const $trigger = $target.closest<HTMLElement>(selectors.trigger);
		if ($trigger) {
			e.preventDefault();

			const $expander = _getTriggerExpander($trigger);
			if ($expander) {
				_toggleExpander($expander);
			}
		}
	}
}

/**
 * Determine which expander element is controlled by a given trigger.
 *
 * @param  {HTMLElement} $trigger - The trigger element whose target
 * is being found.
 *
 * @return {HTMLElement} - The expander element controlled
 * by the specified trigger.
 */
function _getTriggerExpander($trigger: HTMLElement): HTMLElement | undefined {
	let $expander: HTMLElement | undefined;

	const ariaControls = $trigger.getAttribute('aria-controls');

	if (ariaControls) {
		$expander = document.getElementById(ariaControls) || undefined;
	}

	if (!$expander) {
		$expander = $trigger.closest<HTMLElement>(selectors.expander) || undefined;
	}

	return $expander;
}

/**
 * If an expander is open, close it. Otherwise, open it.
 *
 * @param {HTMLElement} $expander - The expander element to toggle.
 */
function _toggleExpander($expander: HTMLElement): void {
	const state = _getExpanderState($expander);

	if (state === ExpanderState.OPENED) {
		_setExpanderState($expander, ExpanderState.CLOSED);
	} else {
		_setExpanderState($expander, ExpanderState.OPENED);
	}
}

/**
 * Determine the current state of an expander element.
 *
 * @param  {HTMLElement} $expander - The expander element to check.
 *
 * @return {ExpanderState} - The current state of the expander element.
 */
function _getExpanderState($expander: HTMLElement): ExpanderState | undefined {
	const ariaExpanded = $expander.getAttribute('aria-expanded');

	if (ariaExpanded === 'true') {
		return ExpanderState.OPENED;
	} else if (ariaExpanded === 'false') {
		return ExpanderState.CLOSED;
	}
}

/**
 * Set the current tate of an expander element.
 *
 * @param {HTMLElement} $expander - The expander element to affect.
 * @param {ExpanderState} state - The desired state of the expander element.
 */
function _setExpanderState($expander: HTMLElement, state: ExpanderState): void {
	const currentState = _getExpanderState($expander);

	if (currentState === state) {
		return;
	}

	const $triggers = _getExpanderTriggers($expander);

	switch (state) {
		case ExpanderState.OPENED:
			$expander.setAttribute('aria-expanded', 'true');
			$triggers.forEach(($trigger) => $trigger.setAttribute('aria-expanded', 'true'));
			break;
		case ExpanderState.CLOSED:
			$expander.setAttribute('aria-expanded', 'false');
			$triggers.forEach(($trigger) => $trigger.setAttribute('aria-expanded', 'false'));
			break;
	}
}

/**
 * Close all expanders.
 */
function _closeAll(): void {
	const $expanders = document.querySelectorAll<HTMLElement>(selectors.expander);

	$expanders.forEach(($expander) => _setExpanderState($expander, ExpanderState.CLOSED));
}

/**
 * If the :target element is an expander element or a descendent of an
 * expander element, expand all expanders containing it then scroll
 * to that element
 */
function _openByTarget(): void {
	// TODO: Allow clicking an anchor link to the current hash to
	// force relevant expanders to open again, if they've been closed

	const $target = document.querySelector<HTMLElement>(':target');

	if ($target) {
		// Loop through all ancestral expanders and open them.
		for (
			let $expander: HTMLElement | null | undefined = $target.closest<HTMLElement>(selectors.expander);
			$expander;
			$expander = $expander.parentElement?.closest(selectors.expander)
		) {
			_setExpanderState($expander, ExpanderState.OPENED);
		}

		// Scroll to the target element. Only works if asynchonous
		window.setTimeout(() => $target.scrollIntoView(), 0);
	}
}

/**
 * Get all trigger elements that control a given expander element.
 *
 * @param  {HTMLElement} $expander - The expander element whose triggers
 * should be returned.
 *
 * @return {NodeListOf<HTMLElement>} - A list of the triggers controlling
 * the specified expander element.
 */
function _getExpanderTriggers($expander: HTMLElement): HTMLElement[] {
	const $allTriggers = Array.from(document.querySelectorAll<HTMLElement>(selectors.trigger));
	const $matchingTriggers = $allTriggers.filter(($trigger) => _getTriggerExpander($trigger) === $expander);

	return $matchingTriggers;
}

export {
	init,
};
