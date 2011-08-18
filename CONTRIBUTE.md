All contributions are managed through http://github.com/transitive

There are three ways to contribute:

  1. Report and Fix bugs.  Create and help resolve issues at http://github.com/transitive/transitive/issues Please include the version of transitive, the version of node and any stack traces or errors you see.  If you are going to contribute a bugfix, please include a test.
  2. Community outreach. Create tutorials, present Transitive at a meetup or local users group.
  3. Add features.

Documentation Patches:

  1. Fork (no need for a topic branch for doc fixes.)
  2. Fix docs, ensure they `make doc` cleanly.
  3. Add yourself to the end of the list in credits.md under "Documentation"
  4. Send a pull request

Fixing Bugs:

  1. Make a note on the issue that you're working on it.
  2. Make a topic branch for the bug in your fork.
  3. Add yourself to the end of the list in credits.md under "Bugfixes"
  4. Submit pull request
  5. Bask in the glory of vanquishing a bug and improving the world.
  6. Send me an email asking for your T-shirt, including your size and your mailing address.

  Note: If your bug fix is more than 15 lines of code, you may need to sign a Contributor License Agreement that should make lawyers happy and keep Transitive freely distributable.  Please email me for details: aaron.blohowiak@gmail.com


Adding Features:

  The best kinds of features preserve backwards compatibility and require being in the `Transitive` object (or one of its nested objects) to work well.  If your feature can be implemented on top of the primitives that Transitive currently exposes, then it might be better to keep it as a plugin or add-on.  Adding css compilation would be a good feature for core, whereas an additional liveRender would be best as an add-on.
  
If you think your feature belongs in Transitive core, then here is the process.
  
  1. Propose it on the mailing list http://groups.google.com/group/transitive
  2. Fork Transitive
  3. Create a topic branch
  4. Add your feature and your tests to your topic branch, rebasing and tidying up your commits into small, logical changes with descriptive commit messages.
  6. Pull request your topic branch
  7. We code review your changes and then accept or ask you to make tweaks.
  8. Revel in the overwhelming sense of accomplishment and pride in making the world a better place.
  9. Send me an email asking for your T-shirt, including your size and your mailing address.

Feature checklist:
  
  * Is it on a topic branch?
  * Does it have documentation?
  * Does it have tests?
  * Does it make breaking API changes? Not a total show-stopper, but will impact release schedule.
  
  Note: If your bug fix is more than 15 lines of code, you may need to sign a Contributor License Agreement that should make lawyers happy and keep Transitive freely distributable.  Please email me for details: aaron.blohowiak@gmail.com