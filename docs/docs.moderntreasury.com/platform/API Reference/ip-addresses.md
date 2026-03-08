# IP Addresses

## API

When using IPv4, `app.moderntreasury.com` may resolve to any address in the following CIDR blocks

* `104.249.160.0/24`
* `104.249.161.0/24`

If your clients are using IPv4, you can include these CIDR blocks in your firewall for egress filtering.

We are unable to support static IPv6 addresses at the moment.

## Webhooks

Modern Treasury will send webhooks to you from one of these IP addresses. You can include them in your firewall for ingress filtering, if you would like to verify the transmission IP as part of a webhook receipt solution.

```
# US cells
52.35.210.16/32
52.13.201.237/32
52.35.218.169/32
35.162.115.65/32
104.249.162.0/24
# USE cells
3.132.64.224/32
18.217.242.20/32
18.118.56.87/32
2600:1f16:1983:c909::/64
2600:1f16:1983:c90a::/64
2600:1f16:1983:c90b::/64
```

## Downloading Lists of IP Addresses

Both lists are available at the following URLs:

* [https://assets.moderntreasury.com/uploads/ip-ranges.json](https://assets.moderntreasury.com/uploads/ip-ranges.json)