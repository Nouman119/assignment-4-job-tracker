
## Answer to the question

#### What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

This is the method as different tools for grabbing elements off the page. Each one behaves a little differently. In JavaScript DOM, getElementById() selects only one element by its unique id.

getElementsByClassName() selects elements by class name and returns a live HTMLCollection, meaning it updates automatically if the DOM changes. 

On the other hand, querySelector() selects the first matching element using any CSS selector. and querySelectorAll() selects all matching elements and returns a static NodeList 

#### How do you create and insert a new element into the DOM?

To create and insert a new element into the DOM, you first use document.createElement() to create the element.

then set its content or attributes  and finally insert it into the page using methods such as appendChild(), append(), or prepend() on a parent element.

This process creates the element in memory first and then attaches it to the DOM so it becomes visible on the webpage.

#### What is Event Bubbling? And how does it work?

Event Bubbling is a process where an event starts from the target (the element that was clicked) and then moves upward through its parent elements one by one.

#### What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where you add one event listener to a parent element instead of adding separate listeners to each child element. 

It works because of event bubbling, where the event moves up from the child to the parent. 

It is useful because it improves performance, reduces code, and also works for dynamically added elements.

#### What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() stops the browser’s default behavior of an event, such as preventing a form from submitting or stopping a link from opening. 

On the other hand, stopPropagation() stops the event from bubbling up to parent elements.
