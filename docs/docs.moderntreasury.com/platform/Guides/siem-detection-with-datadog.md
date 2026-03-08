# SIEM detection with DataDog

You can use DataDog and SIEM to detect and notify when specified audit records are seen. See below for an example setup for SIEM detection in DataDog.

# Example DataDog SIEM Detection

Once the audit records are in the log management system, security detection rules can be set up. The following is an example SIEM rule on DataDog that detects "impossible travel". This detects actions by a single user occurring from different locations that would be impossible to travel between within the time interval they occur. For example, user actions occurring in New York, then London, then New York, all within an hour, would indicate that a malicious actor in London has hijacked the account of a user currently in New York.

In this case, the DataDog SIEM ingests the Modern Treasury audit records, monitors every single record, and a detection will be triggered when an "impossible travel" happens. Alerts can also be set up with this detection rule.

<Image alt="DataDog SIEM impossible travel detection" align="center" src="https://files.readme.io/cdad821-image.png">
  DataDog SIEM impossible travel detection
</Image>