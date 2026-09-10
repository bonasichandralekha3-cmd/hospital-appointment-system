def check_priority(priority):
    if priority.lower() == "high":
        return {
            "priority": priority,
            "status": "Needs immediate attention"
        }

    return {
        "priority": priority,
        "status": "Normal"
    }